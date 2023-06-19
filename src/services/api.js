const logKey = "46064943-054f-44a2-9e19-d8daa5944f98";

export const fetchData = async ({ page = 0, searchCriteriaList = [] } = {}) => {
    try {
        console.log('Fetching audit logs...');
        const response = await fetch('http://localhost:8081/api/v1/log/audit/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "page": page,
                "size": 100,
                "logKey": logKey,
                "searchCriteriaList": searchCriteriaList
            }),
        });
        if(response.ok) {
            console.log('Successfully fetched audit logs');
            return await response.json();
        }
        else {
            const error = {
                status: response.status,
                message: 'Failed to fetch audit logs'
            }
            console.error('Failed to fetch audit logs:', response.status);
            return { error };
        }
    }
    catch(error) {
        console.error('Error fetching audit logs:', error);
        return error;
    }
}