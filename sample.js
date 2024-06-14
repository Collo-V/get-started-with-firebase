import { onAuthStateChanged } from "firebase/auth"
import { getDocRef } from "./firebase"

// Authorization check
useEffect(()=>{
    onAuthStateChanged(auth,user=>{
        if(user !== null ){
            getUserData(user.email)
        } else {
            // sth else
        }
    })
},[])


//GET DOCS

const getOrders = async()=>{
    try{
        
        let snapshot = (await getDocs(dbOrders)).docs
        let orders = []
        snapshot.forEach(orderDoc=>{
            orders.push({
                ...orderDoc.data(),
                id:orderDoc.id
            })
        })
        return orders
        
    }catch (e) {
        console.log(e)
        message({icon:'error',title:'An error occurred'})
    
    }
}

//GET ONE DOC
const getOneOrder = async(id)=>{
    try{
        
        let snapshot = getDoc(getDocRef('orders',id))
        return{
            ...snapshot.data(),
            id:snapshot.id
        }
        
    }catch (e) {
        console.log(e)
        message({icon:'error',title:'An error occurred'})
    
    }
}






// ADD DOC WITH CUSTOM ID

const addDocWithCustomId = async()=>{
    const order = {
        //...Order details
    }
    
    let myOrder = {
        ...order,
        customer:profile.email,
        deadline:order.deadline.$d.toString(),
        dateCreated:serverTimestamp(),
        status:'Pending',
        price:34,
        isPaid:false
    }
    try{
        let orderID
        for(;;){
            orderID = generateRandomNumber()
            let docExists = await (getDoc(getDocRef('orders',orderID))).exists
            if(!docExists){
                break
            }
        }
        let order = await setDoc(getDocRef('orders',orderID),myOrder)
        message({icon:'success',title:'Order received'})
        
    }catch (e) {
        console.log(e)
        message({icon:'error',title:'An error occurred'})
    
    }
}


// ADD DOC WITH FIREBASE ID


const addDocWithFirebaseId = async()=>{
    try{
    
        let order = await addDoc(dbOrders,myOrder)
        message({icon:'success',title:'Order received'})
        
    }catch (e) {
        console.log(e)
        message({icon:'error',title:'An error occurred'})
    
    }
}


// UPDATE

const updateDocument = async(order)=>{
    
    try{
        
        await setDoc(getDocRef('orders',order.id),order)
        message({icon:'success',title:'Order received'})
        
    }catch (e) {
        console.log(e)
        message({icon:'error',title:'An error occurred'})

    }
}
