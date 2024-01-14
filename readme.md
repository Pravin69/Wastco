<h1 align="center">
	Wastco ♻
</h1>
<h4 align="center">Wastco is an innovative project that aims to reduce waste in India by incentivizing people to dispose of their waste in the proper dustbins. The project encourages people to dispose of their waste in the appropriate dustbins by offering rewards for doing so. This way, people will actively take part in the initiative, and there will be no more waste seen in the surroundings. As per the project idea, people will be rewarded for disposing of their waste in the proper dustbins as per the terms and conditions applied. For instance, if a buyer purchases a water bottle from a particular shop and disposes of the product in the specific dustbin after consumption, they will be awarded the same product for free of cost if they do this several times. The project’s only motive is to make a clean and green India.</h4>

<p align="center">
    <img src="https://img.shields.io/badge/%E2%9D%A4-Made%20with%20Love-blue" alt="Gitter">
</p>

<p align="center">
  • <a href="#application-flow">Application Flow</a> 
  • <a href="#key-features">Key Features</a> 
  • <a href="#how-to-use">How To Use</a> 
  • <a href="#demo-images">Demo Images</a> 
  </p>

<p align="center">
<img src="https://github.com/Pravin69/Wastco/blob/main/demo/wastco_demo.png?raw=true" alt="Wastco Capture" style="max-width: 100% !important">
</p>

## Application Flow

**UML Sequence Diagram** :-

![Sequence-diagram](https://github.com/Pravin69/Wastco/blob/main/demo/sequence_diagram.jpg?raw=true)

**UML Activity Diagram** :-

![UML-Activity-Diagram](https://github.com/Pravin69/Wastco/blob/main/demo/activity-diagram.jpg?raw=true)

## Key Features

- **User Roles** :-

  - The web-app supports three distinct user roles, ensuring tailored experiences for administrators, shop owners, and regular users.

- **User Account Management** :-

  - Users can easily create and update their accounts to personalize their experience within the app.

- **Recycling Rewards** :-

  - Users can earn coins by scanning or uploading QR codes from partnered shop dustbins, encouraging and rewarding recycling efforts.

- **Shop Discovery** :-

  - Users can conveniently locate nearby partner shops on a map based on their current location.

- **User Dashboard** :-

  - **Bottle Disposal Graphs:** Users have access to graphical representations of their recycling activities, displaying disposed bottles over the last week and month.

  - **Coins Earned History:** Users can track their earned coins history, providing transparency and motivation for continued recycling.

- **Admin Dashboard** :-

  - **Statistical Insights:** Admins can view statistics such as active users, active shops, and the most-used dustbins through intuitive graphs.

  - **Usage Statistics:** Detailed statistics on user bottle disposals and shop dustbin usage, with customizable time-spans for the last week or month.

- **Admin Functions** :-

  - **Shop Owner Management:** Admins can register shop owners, manage bottle stocks from partnered companies, and create discount coupons to boost recycling participation.

- **Shop Owner Dashboard** :-
  - **Dustbin Usage Tracking:** Shop owners can monitor their dustbin usage through easy-to-understand graphs with weekly or monthly time-spans.

  - **Coin Redemption:** Shop owners can utilize their earned coins to claim discounts when purchasing bottle stocks, encouraging them to continue supporting recycling efforts.

  - **Earning Incentives:** Shop owners earn coins each time their dustbin is used, creating a continuous incentive for active participation.

## How To Use

To clone and run this application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line :

```
# Clone this repository
  git clone https://github.com/Pravin69/Wastco.git

# Go into the repository
  cd Wastco

# Install client dependencies
  cd client
  npm install

# Install backend dependencies
  cd backend
  npm install

# Configure environment variables by creating .env file in the backend and client directory and copy the content of env.example file in .env file, and fill it with your own secrets.
  cp env.example .env

# Create a MongoDB database and name it 'wastco_app', You can use MongoDB Atlas cloud free tier.

# Start backend in a terminal
  cd backend/
  npm start

# Start client in another terminal while backend is running.
  cd client/
  npm run dev
```

## Demo Images

<details>
	<summary>
		<h3> 📸 - Demo Images </h3>
	</summary>
	
 - Homepage
 
	 <img src="https://github.com/Pravin69/Wastco/blob/main/demo/Homepage.jpg?raw=true" alt ="homepage">
#
 - User registration
 
	 <img src="https://github.com/Pravin69/Wastco/blob/main/demo/User%20registration.jpg?raw=true" alt ="User-registration">
#
 - User dashboard
 
	 <img src="https://github.com/Pravin69/Wastco/blob/main/demo/User-dashboard.jpg?raw=true" alt ="">
#
 - User reward points and QR-Scanning Page
 
	 <img src="https://github.com/Pravin69/Wastco/blob/main/demo/User-reward-points.jpg?raw=true" alt ="">
#
 - QR-code scanning results
 
	 <img src="https://github.com/Pravin69/Wastco/blob/main/demo/after-qr-scanning.jpg?raw=true" alt ="">
#
 - User coins earned based on volume of bottle disposed
 
	 <img src="https://github.com/Pravin69/Wastco/blob/main/demo/coins-earned.jpg?raw=true" alt ="">
#
 - User reward history
 
	 <img src="https://github.com/Pravin69/Wastco/blob/main/demo/reward-history.jpg?raw=true" alt ="">
#
 - User map functionality
 
	 <img src="https://github.com/Pravin69/Wastco/blob/main/demo/map-functionality.jpg?raw=true" alt ="">
#
 - Admin dashboard
 
	 <img src="https://github.com/Pravin69/Wastco/blob/main/demo/admin-dashboard.jpg?raw=true" alt ="">
#
 - Admin task tracking page
 
	 <img src="https://github.com/Pravin69/Wastco/blob/main/demo/admin-trello-board.jpg?raw=true" alt ="">
#
 - Admin shop-owner registration
 
	 <img src="https://github.com/Pravin69/Wastco/blob/main/demo/shop-owner-registration.jpg?raw=true" alt ="">
#
 - Active shopowners details
 
	 <img src="https://github.com/Pravin69/Wastco/blob/main/demo/active-shop-owner-details.jpg?raw=true" alt ="">
#
 - Adding bottle stocks
 
	 <img src="https://github.com/Pravin69/Wastco/blob/main/demo/add-bottle-stock.jpg?raw=true" alt ="">
#
 - Bottle details page
 
	 <img src="https://github.com/Pravin69/Wastco/blob/main/demo/bottle-details.jpg?raw=true" alt ="">
#
 - Shop-owner dashboard
 
	 <img src="https://github.com/Pravin69/Wastco/blob/main/demo/shop-owner-dashboard.jpg?raw=true" alt ="">
</details>

## You may also like... 🙂

- [Apna-Shop](https://github.com/Pravin69/mern-ecommerce) - An e-commerce platform
- [Share-and-Fun](https://github.com/Pravin69/Share-and-Fun-Web-app) - A social media web-app
