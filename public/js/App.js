const App = () => {
  const [form, setForm] = React.useState({
    name: "",
    price: "",
  });

  const [products, setproducts] = React.useState([]);

  React.useEffect(() => {
    fetchproducts();
  }, []);

  function fetchproducts() {
    fetch("/api/productslist")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setproducts(data);
      });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.price) {
      return;
    }

    fetch("/api/productslist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then((data) => {
        fetchproducts();
        setForm({
          name:'',
          price:''
        })
      });
  }

  function updateForm(event, field) {
    if (field == "name") {
      setForm({
        ...form,
        name: event.target.value,
      });
    } else if (field == "price") {
      setForm({
        ...form,
        price: event.target.value,
      });
    }
  }


  const deleteProduct = (productId) =>{
      fetch(`/api/productslist/${productId}`,{
        method:'DELETE',
      })
      .then((res)=>res.json())
      .then((data)=>{
        fetchproducts();
        console.log(data)
      });
  }


  return (
    <>
      <div className="w-full h-auto mt-10 border flex p-6">
        <div className="w-[50%] h-[60%]">
          <h1 className="text-xl mb-5 font-mono">Add your Products</h1>

          <form className="" onClick={handleSubmit}>
            <input
              type="text"
              placeholder="product name"
              value={form.name}
              onChange={() => updateForm(event, "name")}
              className="w-[400px] border border-indigo-600 p-3 outline-none rounded-md"
            ></input>

            <input
              type="text"
              placeholder="product price"
              value={form.price}
              onChange={() => updateForm(event, "price")}
              className=" mt-5 w-[400px] border border-indigo-600 p-3 outline-none rounded-md"
            ></input>

            <div className="mt-5">
              <button
                type="submit"
                className="p-3 text-white rounded-lg bg-indigo-600 active:scale-95 transition transition-duration-300"
              >
                Add Products
              </button>
            </div>
          </form>
        </div>

        {/* second part */}
        <div className="w-[50%] h-auto">
          <h1 className="text-xl mb-5 font-mono">Your Products</h1>

          {products.map((item) => (
            <div key={item.id} className="flex items-center justify-between border-l-2  border-indigo-600 text-xl mt-3 bg-white shadow-md rounded p-4 font-mono ">
              <div className="flex w-[200px] justify-between item-center gap-5">
                <p>{item.name}</p>
                <p>${item.price}</p>
              </div>
              <span className="cursor-pointer text-2xl hover:scaleX(105)"
              onClick={()=>deleteProduct(item.id)}
              >
                <ion-icon name="archive"></ion-icon>
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
