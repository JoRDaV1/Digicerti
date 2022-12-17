import React from "react";

function Footer() {
  const d = new Date();
  let year = d.getFullYear();
  return (
    <div className="bg-secondary">
<footer>
<br />

      <ul className="list-inline text-center">
        <li className="list-inline-item">
          <a href="https://twitter.com/vishnus27071772" target="blank">
            <span className="fa-stack fa-lg">
              <i className="fas fa-circle fa-stack-2x"></i>
              <i className="fab fa-twitter fa-stack-1x fa-inverse"></i>
            </span>
          </a>
        </li>
        <li className="list-inline-item">
          <a href="https://www.facebook.com/kanakam.vishnu.5" target="blank">
            <span className="fa-stack fa-lg">
              <i className="fas fa-circle fa-stack-2x"></i>
              <i className="fab fa-facebook-f fa-stack-1x fa-inverse"></i>
            </span>
          </a>
        </li>
        <li className="list-inline-item">
          <a href="https://www.instagram.com/vswaroop04/" target="blank">
            <span className="fa-stack fa-lg">
              <i className="fas fa-circle fa-stack-2x"></i>
              <i className="fab fa-instagram fa-stack-1x fa-inverse"></i>
            </span>
          </a>
        </li>
        <br />
        <br />

        <section >
        <div class="container">
  <div class="row">
    <div class="col-sm">
    </div>
    <div class="col-sm">
    <p className="cpwright">
        
        Tools and Technologies Used:
      </p>
    <p className="svw">
    <ul className="ul">
    <li>
<a href="www.figma.com">   Figma</a> 
</li>
<li>
<a href="www.figma.com">   React</a> 
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
      <p className="bg-dark cpwright text-center">
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
