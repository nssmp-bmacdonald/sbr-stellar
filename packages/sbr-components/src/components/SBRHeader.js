import React from "react";

export const Header = ({ user }) => {
  console.log("--------------");
  console.log("Running the header render func");
  console.log("--------------");
  return (
    <header>
      <div className="storybook-header">
        <div>
          <h1>SBR Shared Header</h1>
        </div>
        <div>
          {user ? (
            <>
              <div>Signed in: {user.name}</div>
            </>
          ) : (
            <>
              <div>Signed out</div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
