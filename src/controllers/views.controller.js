import {productService,cartService} from "../services/index.js";

const mostrarProductos = async (req,res )=>{
    const product = await productService.getProducts();   
    res.render('home',{product,
        css:'home'})
}

const mostrarProductosPage = async (req,res) =>{
    const {page=1} = req.query;
    const {limit=10} = req.query
    const {sort} = req.query
    const {category} = req.query;
    const {status} = req.query;
    let sortAux;
    if (sort!==undefined){
      if (sort =="asc"){
        sortAux = 1;
     }
     else{
       if (sort=="des"){
         sortAux = -1;
       }    
     }
    }  
    
    const {docs,hasPrevPage,hasNextPage,prevPage,nextPage, ...rest} =  await productService.getProductsPaginate(page,limit,sortAux,category,status); 
    console.log(rest)
    const product = docs;  
    res.render('home',{user:req.session.user,product,hasPrevPage,hasNextPage,prevPage,nextPage,page:rest.page,limit,sort ,category,status, css:'home'})
  }


  const realTimeProducts =  async (req,res)=>{       
    res.render('realTimeProducts',{
      css:'realtimeproducts'  
    });
}

 const chat = async(req,res)=>{
    res.render('chat');
  }

const getCarrito = async (req,res) =>{
    const carritoId = await cartService.getCartsByID(req.params.cid).populate('products.product');;
    console.log(carritoId.products);
    let total=0;
    carritoId.products.forEach(element => {        
        total= total + element.quantity*element.product.price;
    });
    console.log(total)
    res.render('home',{carritoId ,total,css:'home'})
  }

const register = (req,res)=>{
    res.render('register',{css:'home'});
  }

const login = (req,res)=>{
    res.render('login',{css:'home'});
  }

  const profile =(req,res)=>{
    res.render('profile',{
        user:req.session.user
    })
  }

  const panelAdmin = (req,res) =>{
    res.render('panelAdmin',{
      css:'realtimeproducts'
    })
  }

export default {
    mostrarProductos,
    mostrarProductosPage,
    realTimeProducts,
    chat,
    getCarrito,
    register,
    login,
    profile,
    panelAdmin
}
