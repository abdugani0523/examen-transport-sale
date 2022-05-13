export default {
    Data: {
        __resolveType: object => {
            if (object.staff_id) return 'Staff'
            else if (object.branch_id) return 'Branch'
            else if (object.transport_id) return 'Transport'
            else if (object.permission_id) return 'Permission'
        }
    },
    SortType: {
        to_small: 2,
        to_large: 1
    }
}