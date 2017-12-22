package zomac.oms.web;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;
import zomac.oms.web.exception.BadRequestException;
import zomac.oms.web.exception.ResourceNotFoundException;
import zomac.oms.web.exception.ResourceRemoveException;

@ControllerAdvice
public class RestExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler({ ResourceNotFoundException.class})
    protected ResponseEntity<Object> handleNotFound(Exception ex, WebRequest request) {
        logger.warn(ex.getMessage() + " " + request.getDescription(true));
        return handleExceptionInternal(ex, "{\"message\":\"" + ex.getMessage() + "\"}",
                new HttpHeaders(), HttpStatus.NOT_FOUND, request);
    }

    @ExceptionHandler({ BadRequestException.class, ResourceRemoveException.class })
    protected ResponseEntity<Object> handleBadRequest(Exception ex, WebRequest request) {
        logger.warn(ex.getMessage() + " " + request.getDescription(true));
        return handleExceptionInternal(ex, "{\"message\":\"" + ex.getMessage() + "\"}",
                new HttpHeaders(), HttpStatus.BAD_REQUEST, request);
    }
}