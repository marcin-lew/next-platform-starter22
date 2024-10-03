"use client";  // Dodaj to na początku pliku

import { useState, useEffect } from 'react';

export default function ProductsPage() {
    const [products, setProducts] = useState([]);

    // Załaduj dane z pliku JSON
    useEffect(() => {
        fetch('/data/products.json')
            .then((response) => response.json())
            .then((data) => setProducts(data));
    }, []);

    // Grupowanie produktów według kategorii
    const groupedProducts = products.reduce((acc, product) => {
        const { Kategoria } = product;
        if (!acc[Kategoria]) {
            acc[Kategoria] = [];
        }
        acc[Kategoria].push(product);
        return acc;
    }, {});

    return (
        <div className="p-8 bg-gray-100">
            {Object.keys(groupedProducts).map((category) => (
                <div key={category} className="mb-10">
                    <h2 className="text-xl font-bold text-gray-700 mb-4">{category}</h2>
                    <table className="min-w-full bg-white">
                        <thead>
                            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                <th className="py-3 px-6 text-left">Image</th>
                                <th className="py-3 px-6 text-left">Name</th>
                                <th className="py-3 px-6 text-left">Product Code</th>
                                <th className="py-3 px-6 text-left">Price</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-600 text-sm font-light">
                            {groupedProducts[category].map((product) => (
                                <tr key={product.product_code} className="border-b border-gray-200 hover:bg-gray-100">
                                    <td className="py-3 px-6 text-left whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="mr-2">
                                                <img
                                                    src={product["images 1"]}
                                                    alt={product.name}
                                                    className="w-12 h-12 object-contain"
                                                />
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-3 px-6 text-left">{product.name}</td>
                                    <td className="py-3 px-6 text-left">{product.product_code}</td>
                                    <td className="py-3 px-6 text-left">{product.price} zł</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ))}
        </div>
    );
}
