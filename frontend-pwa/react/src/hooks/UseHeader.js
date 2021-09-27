
export default function useHeader(){
  const options = (type, body, useToken) => {
    const token = "Bearer " + localStorage.getItem('token');
    const headers = {
        method: type, 
        body: JSON.stringify(body),
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',  
          'Authorization': useToken ? token : ''
        }      
    }

    const headers2 = {
      method: type, 
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',  
        'Authorization': useToken ? token : ''
      }      
    }

    if (body === '') {
      return headers2
    }
    else{
      return headers
    }
  }

  return {
    options
  }
}