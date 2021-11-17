const getRecipientEmail = (users, userLoggedIn) => 
  users.filter((userToFilter) => users !== userLoggedIn?.email)[1];
;

export default  getRecipientEmail;
