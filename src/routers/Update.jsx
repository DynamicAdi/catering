import React from 'react'

function Update({backend}) {
    const handleEdit = async (id) => {
        let url = `${backend}/search`;
        try  {
          setLoading(true);
    
          const response = await axios.request({
            method: 'POST',
            url: url,
            headers: { 
              'Content-Type': 'application/json',
            },
            data: {
              endpoint: activeTab,
              id: id
            }
          })
          SetUpdateData(response.data);
          setLoading(false);
          setVisible(true)
        }
        catch (error) {
          console.error('Error:', error);
        }
      }
    
    useEffect(() => {
        handleEdit()
    }, []);

    return (
    <div>Update</div>
  )
}

export default Update