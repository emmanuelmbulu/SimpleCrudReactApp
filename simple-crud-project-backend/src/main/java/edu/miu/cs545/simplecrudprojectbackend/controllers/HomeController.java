package edu.miu.cs545.simplecrudprojectbackend.controllers;

import edu.miu.cs545.simplecrudprojectbackend.utils.HttpResponseBodyObjectImpl;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.NoHandlerFoundException;

@Controller
@ControllerAdvice
public class HomeController {
    @GetMapping("")
    @ResponseBody
    public ResponseEntity<?> index() {
        return ResponseEntity.ok(
                HttpResponseBodyObjectImpl.builder().code(0)
                        .message("Thank you for trying to consume our APIs")
                        .build()
        );
    }

    @ExceptionHandler({NoHandlerFoundException.class})
    @ResponseBody
    public ResponseEntity<?> handle404(NoHandlerFoundException exception, HttpServletRequest request) {
        return ResponseEntity
                .badRequest()
                .body(
                        HttpResponseBodyObjectImpl.builder().code(1)
                                .message("Resource not found.")
                );
    }
}
