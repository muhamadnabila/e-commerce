# e-commerce
# link deploy = http://hndsupplyco.muhamadnabila.com/

## List of user routes
### URL : '/register'
* METHOD : POST
* BODY : 
    ```
    {
        name : ""
        email : ""
        password : ""

    }
    ```
* AUTHENTICATION : NO
* RESPONSE STATUS : 201
    ``` 
    OUTPUT : {
        name : ""
        token : < jwt_token >
        role: ""
    }
    ```
* RESPONSE STATUS : 500
    ``` 
    OUTPUT {
        message : "Internal server error"
    }
    ```
### URL : '/register/admin'
* METHOD : POST
* BODY : 
    ```
    {
        name : ""
        email : ""
        password : ""
        role: "admin"

    }
    ```
* AUTHENTICATION : NO
* RESPONSE STATUS : 201
    ``` 
    OUTPUT : {
        name : ""
        token : < jwt_token >
        role: ""
    }
    ```
* RESPONSE STATUS : 500
    ``` 
    OUTPUT {
        message : "Internal server error"
    }
    ```

### URL : '/login'
* METHOD : POST
* BODY : 
    ```
    {
        email : ""
        password : ""
    }
    ```
* AUTHENTICATION : NO
* RESPONSE STATUS : 200
    ``` 
    OUTPUT : {
        name : ""
        token : < jwt_token >
        role: ""
    }
    ```
* RESPONSE STATUS : 400
    ``` 
    OUTPUT : {
        message : "username / password invalid"
    }
    ```
* RESPONSE STATUS : 500
    ``` 
    OUTPUT {
        message : "Internal server error"
    }
    ```
## List of transaction routes
### URL : '/transaction'
* METHOD : POST
* AUTHENTICATION : YES
* HEADERS : 
    ```
    {
        token : < jwt_token >
    }
    ```
* BODY : 
    ```
    {
        carts: [{}]
        status : ""
        amount : ""
        userId : < ref_User_ObjectId >
        payment : {}
        arriveConfirmationUser : < boolean >
        arriveConfirmationAdmin : < boolean >
        date : 0
    }
    ```
* RESPONSE STATUS : 201
    ``` 
    OUTPUT : {
        _id : ""
        carts: [{}]
        status : ""
        amount : 0
        userId : ""
        payment : {}
        arriveConfirmationUser : < boolean >
        arriveConfirmationAdmin : < boolean >
        date : 0
        createdAt : ""
        updatedAt : ""
    }
    ```
* RESPONSE STATUS : 404
    ``` 
    OUTPUT : {
        "Amount minimal : 1s"
    }
    ```
* RESPONSE STATUS : 401
    ``` 
    OUTPUT : {
        message : "Unauthorized"
    }
    ```
* RESPONSE STATUS : 500
    ```
    OUTPUT : {
        message : "Internal server error"
    }
    ```'

### URL : '/transaction'
* METHOD : GET
* AUTHENTICATION : YES
* HEADERS : 
    ```
    {
        token : < jwt_token >
    }
    ```
* RESPONSE STATUS : 200
    ``` 
    OUTPUT : [{
        _id : ""
        carts : [{}]
        status : ""
        amount : 0
        userId : ""
        payment : {}
        arriveConfirmationUser : < boolean >
        arriveConfirmationAdmin : < boolean >
        date : 0
        createdAt : ""
        updatedAt : ""
    }]
    ```
* RESPONSE STATUS : 401
    ``` 
    OUTPUT : {
        message : "Unauthorized"
    }
    ```
* RESPONSE STATUS : 500
    ```
    OUTPUT {
        message : "internal server error"
    }
    ```
### URL : '/transaction/:id'
* METHOD : GET
* AUTHENTICATION : YES
* HEADERS : 
    ```
    {
        token : < jwt_token >
    }
    ```
* RESPONSE STATUS : 200
    ``` 
    OUTPUT : {
        _id : ""
        carts: [""]
        status : ""
        amount : 0
        userId : ""
        payment : {}
        arriveConfirmationUser : < boolean >
        arriveConfirmationAdmin : < boolean >
        date : 0
        createdAt : ""
        updatedAt : ""
    }
    ```
* RESPONSE STATUS : 401
    ``` 
    OUTPUT : {
        message : "Unauthorized"
    }
    ```
* RESPONSE STATUS : 400
    ``` 
    OUTPUT : {
        message : "Bad Request"
    }
    ```
* RESPONSE STATUS : 500
    ```
    OUTPUT {
        message : "internal server error"
    }
    ```
### URL : '/transaction/:id'
* METHOD : PUT
* AUTHENTICATION : YES
* HEADERS : 
    ```
    {
        token : < jwt_token >
    }
    ```
* BODY : 
    ```
    {
        carts: [{}]
        status : ""
        amount : 0
        userId : ""
        payment : {}
        arriveConfirmationUser : < boolean >
        arriveConfirmationAdmin : < boolean >
        date : 0
        image : < url_link_image >
    }
    ```
* RESPONSE STATUS : 200
    ``` 
    OUTPUT : {
        _id : ""
        carts: [{}]
        status : ""
        amount : 0
        userId : ""
        payment : {}
        arriveConfirmationUser : < boolean >
        arriveConfirmationAdmin : < boolean >
        date : 0
        createdAt : ""
        updatedAt : ""
    }
    ```
* RESPONSE STATUS : 401
    ``` 
    OUTPUT : {
        message : "Unauthorized"
    }
    ```
* RESPONSE STATUS : 400
    ``` 
    OUTPUT : {
        message : "Bad Request"
    }
    ```
* RESPONSE STATUS : 403
    ``` 
    OUTPUT : {
        message : "Forbidden"
    }
    ```
* RESPONSE STATUS : 500
    ```
    OUTPUT {
        message : "internal server error"
    }
    ```
### URL : '/transaction/:id'
* METHOD : DELETE
* AUTHENTICATION : YES
* HEADERS : 
    ```
    {
        token : < jwt_token >
    }
    ```
* RESPONSE STATUS : 200
    ``` 
    OUTPUT : {
        message : "Delete successfully"
    }
    ```
* RESPONSE STATUS : 401
    ``` 
    OUTPUT : {
        message : "Unauthorized"
    }
    ```
* RESPONSE STATUS : 400
    ``` 
    OUTPUT : {
        message : "Bad Request"
    }
    ```
* RESPONSE STATUS : 403
    ``` 
    OUTPUT : {
        message : "Forbidden"
    }
    ```
* RESPONSE STATUS : 500
    ```
    OUTPUT {
        message : "internal server error"
    }
    ```
### URL : '/items'
* METHOD : POST
* AUTHENTICATIONADMIN : YES
* HEADERS : 
    ```
    {
        token : < jwt_token >
    }
    ```
* BODY : 
    ```
    {
        name : ""
        description : ""
        price : 0
        stock : 0
        category : ""
        banner : boolean
        image : < url_link_image >
    }
    ```
* RESPONSE STATUS : 201
    ``` 
    OUTPUT : {
        _id : ""
        name : ""
        description : ""
        price : 0
        stock : 0
        category : ""
        banner : boolean
        image : < url_link_image >
    }
    ```
* RESPONSE STATUS : 401
    ``` 
    OUTPUT : {
        message : "Unauthorized"
    }
    ```
    ```
* RESPONSE STATUS : 404
    ``` 
    OUTPUT : {
        message : "Name is required"
    }
    ```
* RESPONSE STATUS : 404
    ``` 
    OUTPUT : {
        message : "Description is required"
    }
    ```
* RESPONSE STATUS : 404
    ``` 
    OUTPUT : {
        message : "Price minimal : 1"
    }
    ```
* RESPONSE STATUS : 404
    ``` 
    OUTPUT : {
        message : "Stock is required"
    }
    ```
* RESPONSE STATUS : 404
    ``` 
    OUTPUT : {
        message : "Category is required"
    }
    ```
* RESPONSE STATUS : 500
    ```
    OUTPUT {
        message : "internal server error"
    }
    ```
### URL : '/items'
* METHOD : GET
* AUTHENTICATION : YES
* HEADERS : 
    ```
    {
        token : < jwt_token >
    }
    ```
* RESPONSE STATUS : 200
    ``` 
    OUTPUT : [{
       _id : ""
        name : ""
        description : ""
        price : 0
        stock : 0
        category : ""
        banner : boolean
        image : < url_link_image >
    }]
* RESPONSE STATUS : 401
    ``` 
    OUTPUT : {
        message : "Unauthorized"
    }
    ```
* RESPONSE STATUS : 500
    ```
    OUTPUT {
        message : "internal server error"
    }
    ```
### URL : '/items/:id'
* METHOD : GET
* AUTHENTICATION : YES
* HEADERS : 
    ```
    {
        token : < jwt_token >
    }
    ```
* RESPONSE STATUS : 200
    ``` 
    OUTPUT : {
       _id : ""
        name : ""
        description : ""
        price : 0
        stock : 0
        category : ""
        banner : boolean
        image : < url_link_image >
    }
    ```
* RESPONSE STATUS : 401
    ``` 
    OUTPUT : {
        message : "Unauthorized"
    }
    ```
* RESPONSE STATUS : 500
    ```
    OUTPUT {
        message : "internal server error"
    }
    ```
### URL : '/items/:id'
* METHOD : PUT
* AUTHENTICATIONADMIN : YES
* HEADERS : 
    ```
    {
        token : < jwt_token >
    }
    ```
* BODY : 
    ```
    {
        name : ""
        description : ""
        price : 0
        stock : 0
        category : ""
        banner : boolean
        image : < url_link_image >
    }
    ```
* RESPONSE STATUS : 200
    ``` 
    OUTPUT : {
       _id : ""
        name : ""
        description : ""
        price : 0
        stock : 0
        category : ""
        banner : boolean
        image : < url_link_image >
    }
    ```
* RESPONSE STATUS : 401
    ``` 
    OUTPUT : {
        message : "Unauthorized"
    }
    ```
* RESPONSE STATUS : 500
    ```
    OUTPUT {
        message : "internal server error"
    }
    ```
### URL : '/items/:id'
* METHOD : DELETE
* AUTHENTICATIONADMIN : YES
* HEADERS : 
    ```
    {
        token : < jwt_token >
    }
    ```
* RESPONSE STATUS : 200
    ``` 
    OUTPUT : {
       message : "Delete successfully"
    }
    ```
* RESPONSE STATUS : 401
    ``` 
    OUTPUT : {
        message : "Unauthorized"
    }
    ```
* RESPONSE STATUS : 403
    ``` 
    OUTPUT : {
        message : "Bad request"
    }
* RESPONSE STATUS : 500
    ```
    OUTPUT {
        message : "internal server error"
    }
    ```
### URL : '/cart'
* METHOD : POST
* AUTHENTICATION : YES
* HEADERS : 
    ```
    {
        token : < jwt_token >
    }
    ```
* BODY : 
    ```
    {
        name : ""
        quantity : ""
        size : 0,
        itemId : < ref_item >
    }
    ```
* RESPONSE STATUS : 201
    ``` 
    OUTPUT : {
        _id : ""
        name : ""
        quantity : ""
        size : 0,
        itemId : < ref_item >
    }
    ```
* RESPONSE STATUS : 401
    ``` 
    OUTPUT : {
        message : "Unauthorized"
    }
    ```
    ```
* RESPONSE STATUS : 500
    ```
    OUTPUT {
        message : "internal server error"
    }
    ```
### URL : '/cart'
* METHOD : GET
* AUTHENTICATION : YES
* HEADERS : 
    ```
    {
        token : < jwt_token >
    }
    ```
* RESPONSE STATUS : 200
    ``` 
    OUTPUT : [{
        _id : ""
        name : ""
        quantity : ""
        size : 0,
        itemId : < ref_item >
    }]
* RESPONSE STATUS : 401
    ``` 
    OUTPUT : {
        message : "Unauthorized"
    }
    ```
* RESPONSE STATUS : 500
    ```
    OUTPUT {
        message : "internal server error"
    }
    ```
### URL : '/cart/:id'
* METHOD : GET
* AUTHENTICATION : YES
* HEADERS : 
    ```
    {
        token : < jwt_token >
    }
    ```
* RESPONSE STATUS : 200
    ``` 
    OUTPUT : {
        _id : ""
        name : ""
        quantity : ""
        size : 0,
        itemId : < ref_item >
    }
    ```
* RESPONSE STATUS : 401
    ``` 
    OUTPUT : {
        message : "Unauthorized"
    }
    ```
* RESPONSE STATUS : 500
    ```
    OUTPUT {
        message : "internal server error"
    }
    ```
### URL : '/cart/:id'
* METHOD : PUT
* AUTHENTICATION : YES
* HEADERS : 
    ```
    {
        token : < jwt_token >
    }
    ```
* BODY : 
    ```
    {
        name : ""
        quantity : ""
        size : 0,
        itemId : < ref_item >
    }
    ```
* RESPONSE STATUS : 200
    ``` 
    OUTPUT : {
        _id : ""
        name : ""
        quantity : ""
        size : 0,
        itemId : < ref_item >
    }
    ```
* RESPONSE STATUS : 401
    ``` 
    OUTPUT : {
        message : "Unauthorized"
    }
    ```
* RESPONSE STATUS : 403
    ``` 
    OUTPUT : {
        message : "Bad request"
    }
    ```
* RESPONSE STATUS : 500
    ```
    OUTPUT {
        message : "internal server error"
    }
    ```
### URL : '/items/:id'
* METHOD : DELETE
* AUTHENTICATION : YES
* HEADERS : 
    ```
    {
        token : < jwt_token >
    }
    ```
* RESPONSE STATUS : 200
    ``` 
    OUTPUT : {
       message : "Delete successfully"
    }
    ```
* RESPONSE STATUS : 401
    ``` 
    OUTPUT : {
        message : "Unauthorized"
    }
    ```
* RESPONSE STATUS : 403
    ``` 
    OUTPUT : {
        message : "Bad request"
    }
    ```
* RESPONSE STATUS : 500
    ```
    OUTPUT {
        message : "internal server error"
    }
    ```