'use strict';

const express = require('express');
const app = express();

// Endpoint domyślny
app.get('/', (req, res) => {
    res.send('Serwer działa poprawnie! Skorzystaj z endpointów: /math/circle/:r, /math/rectangle/:width/:height, /math/power/:base/:exponent');
});

// 1. Endpoint do obliczania pola powierzchni i obwodu koła
app.get('/math/circle/:r', (req, res) => {
    const r = parseFloat(req.params.r); // Pobieranie promienia
    if (isNaN(r) || r <= 0) { // Sprawdzanie, czy promień jest poprawny
        return res.status(400).json({ error: 'Invalid radius' });
    }
    const area = (Math.PI * r * r).toFixed(2); // Obliczanie pola
    const circumference = (2 * Math.PI * r).toFixed(2); // Obliczanie obwodu
    res.json({ area, circumference });
});

// 2. Endpoint do obliczania pola powierzchni i obwodu prostokąta
app.get('/math/rectangle/:width/:height', (req, res) => {
    const width = parseFloat(req.params.width); // Pobieranie szerokości
    const height = parseFloat(req.params.height); // Pobieranie wysokości
    if (isNaN(width) || isNaN(height) || width <= 0 || height <= 0) { // Sprawdzanie, czy dane są poprawne
        return res.status(400).json({ error: 'Invalid width or height' });
    }
    const area = (width * height).toFixed(2); // Obliczanie pola
    const perimeter = (2 * (width + height)).toFixed(2); // Obliczanie obwodu
    res.json({ area, perimeter });
});

// 3. Endpoint do obliczania potęgi i pierwiastka kwadratowego
app.get('/math/power/:base/:exponent', (req, res) => {
    const base = parseFloat(req.params.base); // Podstawa
    const exponent = parseFloat(req.params.exponent); // Wykładnik

    // Sprawdzanie, czy dane są poprawne
    if (isNaN(base) || isNaN(exponent)) {
        return res.status(400).json({ error: 'Invalid input' });
    }

    const result = Math.pow(base, exponent); // Potęga
    let response = { result };

    // Jeśli zapytanie zawiera opcję 'root=true', dodajemy pierwiastek kwadratowy
    if (req.query.root === 'true') {
        response.root = Math.sqrt(base).toFixed(2); // Pierwiastek kwadratowy z podstawy
    }

    res.json(response);
});

// Uruchomienie serwera
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
