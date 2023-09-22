export class PermissionDenied extends Error{
    constructor(message:string){
        super(message);
        this.name = "PermissionDenied";
    }
}