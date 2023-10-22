package edu.miu.cs545.simplecrudprojectbackend.utils;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data @AllArgsConstructor
@Builder
public class HttpResponseBodyObjectImpl implements HttpResponseBodyObject {
    private int code;
    private String message;
}
