import {useParams, useSearchParams} from "react-router-dom";
import React from "react";

export default function ComponentWrapper(Component:any) {
    return function ComponentWithoutParams(props:any) {
        const params = useParams();
        const [searchParams] = useSearchParams();
        const allParams = {...params, searchParams}
        return (<Component {...props} params={allParams} />);
    }
}