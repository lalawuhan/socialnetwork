import { useState } from "react";
import axios from "../axios";

export function useAuthSubmit(url, values) {
    const [error, setError] = useState();

    const submit = (e) => {
        e.preventDefault();
        axios.post(url, values).then(({ data }) => {
            if (data.success) {
                location.replace("/");
            } else {
                setError(true);
            }
        });
    };

    return [submit, error];
}
