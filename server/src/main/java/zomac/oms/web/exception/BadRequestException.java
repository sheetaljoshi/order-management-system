package zomac.oms.web.exception;

public class BadRequestException extends RuntimeException {

    public BadRequestException() {
        super("Bad request");
    }
}