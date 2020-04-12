import { useState } from "react";
import axios from "../axios.js";

export function useAuthSubmit(url, values) {
    const submit = () => {
        axios.post(url, values).then(({ data }) => {
            if (data.success) {
                location.replace("/");
            } else {
                setError(true);
            }
        });
    };
    const [error, setError] = useState();

    return [submit, error];
}
