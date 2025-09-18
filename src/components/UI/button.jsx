import * as React from "react";

// A reusable button component
export default function Button({ children, className, ...props }) {
    return (
        <button
            className={`px-4 py-2 rounded-2xl text-white transition-colors shadow-md ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}