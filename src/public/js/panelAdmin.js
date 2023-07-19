

const getErrorSpan = document.querySelector('.errorForm');
const getErrorSpanAct = document.querySelector('.errorFormAct');
const getErrorSpanEli = document.querySelector('.errorFormEli');

const valorInput = document.querySelector('#formulario');
console.log(valorInput)

valorInput.addEventListener('submit',async (e)=>{
    e.preventDefault();    
    const title = e.target.title.value
    const description  = e.target.description.value
    const price = e.target.price.value
    const thumbnail = e.target.thumbnail.value
    const code = e.target.code.value
    const stock = e.target.stock.value
    const category = e.target.category.value
    const status = e.target.status.value

    if (title && description && price && thumbnail && code && stock && category && status){
        
        const productForm ={ 
            title,
            description,
            price, 
            thumbnail,
            code,
            stock,
            category,
            status
        }          
        console.log(productForm)     
        const response = await fetch('/api/products', {
            method: 'POST',
           body: JSON.stringify(productForm),
            headers: {
              'Content-Type': 'application/json',
            },
         });
         const responseData = await response.json();
         console.log(responseData);     
        getErrorSpan.style.display = 'none'  
        Swal.fire('Se agrego el producto') 
    }
    else {
        
        getErrorSpan.style.display = 'block'
    }

})

const valorInputFormActualizacion = document.querySelector('#formularioActualizacion');

valorInputFormActualizacion.addEventListener('submit',async (e)=>{
    e.preventDefault();    
    const id = e.target.id.value
    const title = e.target.title.value
    const description  = e.target.description.value
    const price = e.target.price.value
    const thumbnail = e.target.thumbnail.value
    const code = e.target.code.value
    const stock = e.target.stock.value
    const category = e.target.category.value
    const status = e.target.status.value

    if (title && description && price && thumbnail && code && stock && category && status && id){
        
        const productForm ={             
            title,
            description,
            price, 
            thumbnail,
            code,
            stock,
            category,
            status
        }          
        console.log(productForm)
        const response = await fetch(`/api/products/${id}`, {
            method: 'PUT',
           body: JSON.stringify(productForm),
            headers: {
              'Content-Type': 'application/json',
            },
         });
         const responseData = await response.json();
         console.log(responseData); 

        getErrorSpanAct.style.display = 'none'  
        Swal.fire('Se modifico el producto')   
    }
    else {
        
        getErrorSpanAct.style.display = 'block'
    }

})


const valorInputFormEliminar = document.querySelector('#formularioEliminar');

valorInputFormEliminar.addEventListener('submit', async (e)=>{
    e.preventDefault();    
    const id = e.target.id.value
   

    if (id){
        
        const productForm ={ 
            id            
        }          
        console.log(productForm)
        const response = await fetch(`/api/products/${id}`, {
            method: 'DELETE',
           body: JSON.stringify(productForm),
            headers: {
              'Content-Type': 'application/json',
            },
         });
         const responseData = await response.json();
         console.log(responseData);    
        getErrorSpanEli.style.display = 'none'  
        Swal.fire('Se elimino el producto')  
    }
    else {
        
        getErrorSpanEli.style.display = 'block'
    }

})


