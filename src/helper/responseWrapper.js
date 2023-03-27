class responseWrapper{
    constructor(res){
        this.res=res;
    }

    handle(data,status,statusCode){
        let res={};
        if(statusCode >=200 && statusCode <=300){
            res={
                result:data,
                status,
            };
        }else{
            res={
                errorMessage:data,
                status,
            }
        };
        this.res.status(statusCode).send(res);
    }

    ok(data){
        this.handle(data,'ok',200);
    }

    created(data){
        this.handle(data,'data created successfully',201);
    }

    updated(data){
        this.handle(data,'data updated successfully',201);
    }

    deleted(data){
        this.handle(data,'data deleted successfully',290);
    }

    internalError(errMessage){
        this.handle(errMessage,'UNKNOWN ERROR',500);
    }
    
    notFound(errMessage){
        this.handle(errMessage,'RECORD NOT FOUND',400);
    }
}
module.exports=responseWrapper;