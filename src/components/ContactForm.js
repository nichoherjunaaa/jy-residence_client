import { UserCircle, WarningCircle } from "@phosphor-icons/react";

export default function ContactForm({ formData, onChange, errors }) {
    const fields = [
        { name: 'firstName', label: 'First Name', placeholder: 'e.g. John' },
        { name: 'lastName', label: 'Last Name', placeholder: 'e.g. Doe' },
        { name: 'email', label: 'Email Address', placeholder: 'john@example.com' },
        { name: 'phone', label: 'Phone Number', placeholder: '08123456789' }
    ];

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <UserCircle size={28} className="text-accent" /> Contact Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {fields.map((field) => {
                    const hasError = !!errors?.[field.name];

                    return (
                        <div key={field.name} className="space-y-1">
                            <label className={`text-xs font-bold uppercase ${hasError ? 'text-red-500' : 'text-gray-500'}`}>
                                {field.label} {field.name !== 'lastName' && <span className="text-red-500">*</span>}
                            </label>
                            <div className="relative">
                                <input
                                    name={field.name}
                                    value={formData[field.name]}
                                    onChange={onChange}
                                    className={`w-full p-3 border rounded-lg outline-none transition-all focus:ring-2 
                                        ${hasError
                                            ? 'border-red-500 focus:ring-red-200'
                                            : 'border-gray-200 focus:ring-accent/20 focus:border-accent'
                                        }`}
                                    placeholder={field.placeholder}
                                />
                                {hasError && (
                                    <div className="absolute right-3 top-3.5 text-red-500">
                                        <WarningCircle size={20} weight="fill" />
                                    </div>
                                )}
                            </div>
                            {hasError && (
                                <p className="text-red-500 text-[11px] font-medium mt-1 animate-in fade-in slide-in-from-top-1 duration-200">
                                    {errors[field.name]}
                                </p>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Field Tambahan untuk Spesial Request (Opsional) */}
            <div className="mt-6 space-y-1">
                <label className="text-xs font-bold uppercase text-gray-500">Special Requests (Optional)</label>
                <textarea
                    name="requests"
                    value={formData.requests}
                    onChange={onChange}
                    rows={3}
                    className="w-full p-3 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
                    placeholder="e.g. Late check-in, extra pillows, etc."
                />
            </div>
        </div>
    );
}