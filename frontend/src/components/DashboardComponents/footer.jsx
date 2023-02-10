import React from "react";

function Footer() {
  const d = new Date();
  let year = d.getFullYear();
  return (
    <div className="bg-secondary">
<footer>
<br />

      <ul style={{listStyleType:"none"}} className="list-inline text-center">

     

        <section >
        <div class="container">
  <div class="row">
    <div class="col-sm">
    </div>
    <div class="col-sm">
    <p className="cpwright" style={{color:"#ffff", marginLeft:"20px"}}>
        
        Tools and Technologies Used:
      </p>
    <p className="svw">
    <ul style={{listStyleType:"none"}} className="ul">
    <li>
<a href="www.figma.com">   Figma</a> 
</li>
<li>
<a href="www.react.com">   React</a> 
</li>
<li>
<a href="www.figma.com">   NodeJS and ExpressJS</a> 
</li>
<li>
<a href="www.figma.com"> MongoDB</a> 
</li>
<li>
<a href="www.figma.com"> Ethereum Testnet</a> 
</li>
    </ul>
  

          </p>    </div>
    <div class="col-sm">
    </div>
  </div>
</div>


        </section>
      </ul>
      <p className="bg-light cpwright text-center">
      <br />
&copy; DigiCerti {year}
<br />
<br />

</p>

    </footer>


    </div>
    
  );
}

export default Footer;
