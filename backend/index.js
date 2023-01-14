import React from "react";

function Project(props) {
  return (
    <div className="Project">
      <h3>
        {" "}
        <u> My Projects </u>
      </h3>

      <div className="rcornersforProjectoutside">
      <div className="rcornersforProject">
          <div class="worksContainer sectionContainer">
            <article class="workBox">
              <div class="workImageContainer">
                <img
                  src="https://i.ibb.co/RyLFZfT/gaivi.jpg"
                  alt="Capture"
                  border="0"
                />{" "}
              </div>
              <div class="workDescribeContainer">
                <h3>Grocery Store</h3>
                <h4>
                  Technologies Used: <span class="techStack">Node JS</span>,{" "}
                  <span class="techStack">MongoDB</span>,{" "}
                  <span class="techStack">EJS</span>
                </h4>
                <ul>
                  <li>Completely built with Node JS and MongoDB </li>
                  <li>User can login and buy example products</li>

                  <li>
                    They can add items to their cart and checkout 
                  </li>
  <li>
                    Whenever user clicks on add to cart the product is added to db and display the total in checkout
                  </li>
                </ul>
                <div class="workLinks">
                  <a
                    href="https://gaivi-grocery.herokuapp.com/"
                    class="liveLink"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Live
                  </a>
                  <a
                    href="https://github.com/Vswaroop04/grocery-system"
                    class="repoLink"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Repo
                  </a>
                </div>
              </div>
            </article>
          </div>
        </div>
        <div className="rcornersforProject">
          <div class="worksContainer sectionContainer">
            <article class="workBox">
              <div class="workImageContainer">
                <img
                  src="https://i.ibb.co/V9y2pmJ/Capture.png"
                  alt="Capture"
                  border="0"
                />{" "}
              </div>
              <div class="workDescribeContainer">
                <h3>Chat Application</h3>
                <h4>
                  Technologies Used: <span class="techStack">Node JS</span>,{" "}
                  <span class="techStack">Express</span>,{" "}
                  <span class="techStack">Socket</span>
                </h4>
                <ul>
                  <li>Completely built with Sockets Requests </li>
                  <li>A specific Room Will Be Created For Chatting</li>
                  <li>
                    Real-time Messaging and Users can Send Their Location too
                  </li>
                </ul>
                <div class="workLinks">
                  <a
                    href="https://safe-coast-70363.herokuapp.com/"
                    class="liveLink"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Live
                  </a>
                  <a
                    href="https://github.com/Vswaroop04/Chat-Application-Using-NodeJs"
                    class="repoLink"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Repo
                  </a>
                </div>
              </div>
            </article>
          </div>
        </div>

        {/* 2 */}
        <div className="rcornersforProject">
          <div class="worksContainer sectionContainer">
            <article class="workBox">
              <div class="workImageContainer">
                <img
                  src="https://i.ibb.co/wWwr0Sr/Capture.png"
                  alt="Capture"
                  border="0"
                />{" "}
              </div>
              <div class="workDescribeContainer">
                <h3>Blog Website</h3>
                <h4>
                  Technologies Used: <span class="techStack">Node Js</span>,{" "}
                  <span class="techStack">REST API</span>,{" "}
                  <span class="techStack">Express</span>
                </h4>
                <ul>
                  <li>Completely built with Api Get,Post Requests</li>
                  <li>
                    Using Mailchimp Api provider We Can Check the Customer
                    Details
                  </li>
                  <li>
                    Customer Can Subscribe and Unsubscribe From the Services
                  </li>
                </ul>
                <div class="workLinks">
                  <a
                    href="https://floating-wildwood-49118.herokuapp.com/"
                    class="liveLink"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Live
                  </a>
                  <a
                    href="https://github.com/Vswaroop04/News-Letter-Sign-up"
                    class="repoLink"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Repo
                  </a>
                </div>
              </div>
            </article>
          </div>
        </div>

        {/* 3 */}
        <div className="rcornersforProject">
          <div class="worksContainer sectionContainer">
            <article class="workBox">
              <div class="workImageContainer">
                <img
                  src="https://i.ibb.co/fCSdJK3/Capture.png"
                  alt="Capture"
                  border="0"
                />{" "}
              </div>
              <div class="workDescribeContainer">
                <h3>VINKS - Movie Ticket Booking System</h3>
                <h4>
                  Technologies Used: <span class="techStack">NodeJS</span>,{" "}
                  <span class="techStack">MYSQL</span>,{" "}
                  <span class="techStack">EJS</span>
                </h4>
                <ul>
                  <li>This Was Built using NodeJS Express Routes</li>
                  <li>The Movie Details Are Fetched From MySql Db</li>
                  <li>
                    Real-time Data Passes through MYsqlDB -- NodeJS -- Ejs
                    Template
                  </li>
                </ul>
                <div class="workLinks">
                  <a
                    href="/"
                    class="liveLink"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Live
                  </a>
                  <a
                    href="https://github.com/Vswaroop04/Movie-Booking-System"
                    class="repoLink"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Repo
                  </a>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Project;
