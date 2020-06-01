import AppException from './AppException';
import HttpStatus from 'http-status-codes';

class PostNotFoundException extends AppException {
    
    constructor(id: string){
        super(HttpStatus.NOT_FOUND, `Post with id: ${id} was not found`);
    }
}

export default PostNotFoundException;