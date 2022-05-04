

  const checkState = (res) => {
    if(res.state ===200){
        if(res.data.status === 403){
            return res.data
        }
        let obj={
            state:res.state,
            data:res.data
        }
        return obj
    }

     if(res.state ===500){
        return res.error
    }
}

export default checkState;