it('sem testes, ainda', () => {})

const getSomething = ()=> {

    return new Promise((resolve, reject)=>{
        setTimeout(() => {
            resolve(11);
        }, 1000)
    }) 
}

const system = async () => {
    console.log('init')
    const some = await getSomething()
    // getSomething().then(some => {
        // console.log(`Something is ${some}`)
        // console.log('end')
    // })
    console.log(`Something is ${some}`)
    console.log('end')
       
    }
    
system();