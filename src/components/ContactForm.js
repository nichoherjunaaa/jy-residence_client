import { UserCircle } from "@phosphor-icons/react";

export default function ContactForm({ formData, onChange }) {
    const fields = [
        { name: 'firstName', label: 'First Name' },
        { name: 'lastName', label: 'Last Name' },
        { name: 'email', label: 'Email Address' },
        { name: 'phone', label: 'Phone Number' }
    ];

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <UserCircle size={28} className="text-accent" /> Contact Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {fields.map((field) => (
                    <div key={field.name} className="space-y-1">
                        <label className="text-xs font-bold uppercase text-gray-500">{field.label}</label>
                        <input
                            name={field.name}
                            value={formData[field.name]}
                            onChange={onChange}
                            className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-accent/20"
                            placeholder={`Enter your ${field.label.toLowerCase()}`}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}