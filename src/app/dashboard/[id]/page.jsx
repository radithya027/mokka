// app/dashboard/[id]/page.js

export default async function DashboardDetail({ params }) {
    const { id } = await params; // Await the params object

    // Dummy data for illustration; in a real scenario, fetch details based on `id`
    const itemDetails = {
        1: {
            name: "Burger",
            ingredients: [
                { name: "Bun", quantity: "1 piece", price: "200" },
                { name: "Cheese", quantity: "1 slice", price: "100" },
                { name: "Lettuce", quantity: "1 leaf", price: "50" },
                { name: "Pickle", quantity: "1 slice", price: "30" },
            ],
        },
        2: {
            name: "Pizza",
            ingredients: [
                { name: "Dough", quantity: "1 base", price: "500" },
                { name: "Tomato Sauce", quantity: "2 tbsp", price: "150" },
                { name: "Pepperoni", quantity: "5 slices", price: "200" },
            ],
        },
        // Add more items as needed
    };

    const item = itemDetails[id] || { name: "Unknown Item", ingredients: [] };

    return (
        <div className="container mx-auto p-6 bg-white shadow-md rounded-lg">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Details for {item.name}</h1>
            <table className="w-full bg-white border border-gray-200 shadow rounded">
                <thead>
                    <tr>
                        <th className="py-3 px-4 bg-gray-100 text-gray-700 font-semibold text-left">Ingredient</th>
                        <th className="py-3 px-4 bg-gray-100 text-gray-700 font-semibold text-left">Quantity</th>
                        <th className="py-3 px-4 bg-gray-100 text-gray-700 font-semibold text-left">Price</th>
                    </tr>
                </thead>
                <tbody>
                    {item.ingredients.map((ingredient, index) => (
                        <tr key={index} className="border-b">
                            <td className="py-3 px-4 text-gray-700">{ingredient.name}</td>
                            <td className="py-3 px-4 text-gray-700">{ingredient.quantity}</td>
                            <td className="py-3 px-4 text-gray-700">{ingredient.price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
