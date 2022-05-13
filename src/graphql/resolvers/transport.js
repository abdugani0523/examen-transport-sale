import check_token from '../utils/checkToken.js'
import execute from '../utils/dbConnection.js'
import { GraphQLUpload } from "graphql-upload"
import { finished  } from 'stream/promises'
import { createWriteStream, unlink } from "fs"
import { join, parse } from "path"
import { check_all_permission, check_permission } from '../queries/permission.js'
import { UserInputError } from 'apollo-server-core'
import { add_transport, delete_transport, get_transport, get_transports, update_transport } from '../queries/transport.js'
import format from 'pg-format'
import { get_branch_by_id } from '../queries/branch.js'
import { get_color } from '../queries/other.js'

export default {
    Upload: GraphQLUpload,
    Query: {
        transports: async (_, { branch, search, sort }, { token, user_agent }) => {
            if (!token) throw new UserInputError('Token is required!')
            const [ staff ] = await check_token(token, user_agent)
            let rows = (await execute(check_permission, staff.staff_id, 1, 2)).map(row => row.branch)
            if(!rows.length) throw new UserInputError('you are not allowed to see the transports!')
            if (branch) {
                if (rows.includes(+branch)) {
                    rows = [ branch ]
                } else {
                    throw new UserInputError('you have no permission to the selected branch')
                }
            } 
            const sort_key = Object.keys(sort || {})[0]
            const transports = await execute(format(get_transports, rows), search,  sort_key, sort?.[sort_key])
            return transports.map(transport => {
                transport.transport_color = {
                    color_id: transport.color_id,
                    color_name: transport.color_name
                } 
                transport.branch = {
                    branch_id: transport.branch_id,
                    branch_name: transport.branch_name,
                    address: {
                        city: transport.city_name,
                        district: transport.district_name
                    }
                }
                return transport
            }) 
        }
    },
    Mutation: {
        addTransport: async (_, { input: { branch, transport_model, transport_color, transport_image } }, { token, user_agent }) => {
            if (!token) throw new UserInputError('Token is required!')
            const [ staff ] = await check_token(token, user_agent)
            const checkPermission = await execute(check_all_permission, staff.staff_id, branch, 1, 1)
            if (!checkPermission.length) throw new UserInputError('Permission not allowed!')

            const check_branch = await execute(get_branch_by_id, branch)
            if (!check_branch.length) throw new UserInputError('Selected branch not found!')

            const check_color =  await execute(get_color, transport_color)
            if (!check_color.length) throw new UserInputError('Selected color not found!')

            // Upload image
            let { createReadStream, filename, mimetype } = await transport_image;
            if (!mimetype?.includes('image')) throw new UserInputError('You can only upload image!')
            let { name, ext } = parse(filename)
            filename = name + '-' + Date.now() + ext
            const stream = createReadStream();
            const out = createWriteStream(join(process.cwd(), 'assets', filename));
            stream.pipe(out);
            await finished(out);

            await execute(add_transport, transport_model, transport_color, branch, filename)

            return {
                status: 200,
                message: "Transport added",
            }

        },
        changeTransport: async (_, { transport_id, input: { branch, transport_model, transport_color } }, { token, user_agent }) => {
            if (!token) throw new UserInputError('Token is required!')
            const [ staff ] = await check_token(token, user_agent)
            const checkPermission = await execute(check_all_permission, staff.staff_id, branch, 1, 4)
            if (!checkPermission.length) throw new UserInputError('Permission not allowed!')

            const check_transport = await execute(get_transport, transport_id)
            if (!check_transport.length) throw new UserInputError('Selected transport not found!')

            const check_branch = await execute(get_branch_by_id, branch)
            if (!check_branch.length) throw new UserInputError('Selected branch not found!')

            const check_color =  await execute(get_color, transport_color)
            if (!check_color.length) throw new UserInputError('Selected color not found!')

            await execute(update_transport,transport_id, branch, transport_model, transport_color)

            return {
                status: 200,
                message: "Transport changed",
            }
        },
        deleteTransport: async (_, { transport_id }, { token, user_agent }) => {
            if (!token) throw new UserInputError('Token is required!')
            const [ staff ] = await check_token(token, user_agent)
            const transport = await execute(get_transport, transport_id)
            if (!transport.length) throw new UserInputError('Transport not found!')
            const checkPermission = await execute(check_all_permission, staff.staff_id, transport[0].branch, 1, 3)
            if (!checkPermission.length) throw new UserInputError('Permission not allowed!')

            await execute(delete_transport, transport_id)

            return {
                status: 200,
                message: "Transport deleted",
            }
        }
    },
    Transport: {
        transport_img: (global, _, { hostname, protocol }) => {
            return `${protocol}://${hostname}:${process.env.port}/${global.transport_image}`
        },
    }
}