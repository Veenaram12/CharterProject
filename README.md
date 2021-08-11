# Application Info

It is a Web application which give reward points based on the user transaction.

The application contains data.json file with the following format: 
    [{ "transaction_id": 1, "name": "andy", "date": "27-06-2021", "transaction_amount": 458 },]

This Application will generate reward points based on the transaction data present in data.json file.

### Reward Point formula: 
    If transaction is greater than 100, then: 
    reward = (2*(transaction - 100)) + 50 2) 
    else if transaction is greater than 50 and less than 100, then: 
    reward = (transaction - 50) 3) 
    else 0 reward point will be given

The application also have an add transaction option by which user can add more transactions in the UI

### External Library

Used Antd library for creating UI component. It gives easy integration with react application and provides cleaner and reusable UI components.

# Starting the Application

1. Installing dependencies

        yarn install

2. Running Application
    
        yarn start



