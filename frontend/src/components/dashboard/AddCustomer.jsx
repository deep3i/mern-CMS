import { useState } from "react";
import { useDispatch } from "react-redux";
import { z } from "zod";
import { createCustomersAsync } from "../../redux/customer";

const customerSchema = z.object({
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Invalid email"),
    phone: z
        .string()
        .regex(/^\d+$/, "Phone must contain only numbers")
        .min(10, "Phone must be at least 10 digits")
        .max(15, "Phone can be a maximum of 15 digits"),
    company: z.string().min(1, "Company name is required"),
});

const AddCustomerModal = ({ isOpen, onClose, handleCall }) => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        company: "",
    });

    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({
        name: false,
        email: false,
        phone: false,
        company: false,
    });

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleBlur = (e) => {
        setTouched((prev) => ({
            ...prev,
            [e.target.name]: true,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validation = customerSchema.safeParse(formData);
        if (!validation.success) {
            const fieldErrors = {};
            validation.error.issues.forEach((issue) => {
                fieldErrors[issue.path[0]] = issue.message;
            });
            setErrors(fieldErrors);
            return;
        }
        dispatch(createCustomersAsync({
            data: formData,
            callback: () => {
                onClose();
                setFormData({ name: "", email: "", phone: "", company: "" });
                handleCall();
            }
        }));
        setErrors({});
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md">
                <h2 className="text-xl font-bold mb-4">Add Customer</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {["name", "email", "phone", "company"].map((field) => (
                        <div key={field}>
                            <label className="block text-sm font-medium capitalize">{field}</label>
                            <input
                                type="text"
                                name={field}
                                value={formData[field]}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={`mt-1 block w-full border ${touched[field] && errors[field] ? "border-red-500" : "border-gray-300"
                                    } rounded p-2`}
                            />
                            {touched[field] && errors[field] && (
                                <p className="text-red-500 text-sm mt-1">{errors[field]}</p>
                            )}
                        </div>
                    ))}
                    <div className="flex justify-end gap-2 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400 cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddCustomerModal;