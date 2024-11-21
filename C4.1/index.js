'use strict';

const express = require('express');
const cors = require('cors'); // Obsługa CORS
const app = express();

// Włączenie CORS
app.use(cors());

app.use(express.static('C4.2'));

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

// Dane
let categories = ['funnyJoke', 'lameJoke'];

let funnyJoke = [
  { 'joke': 'Dlaczego komputer poszedł do lekarza?', 'response': 'Bo złapał wirusa!' },
  { 'joke': 'Dlaczego komputer nie może być głodny?', 'response': 'Bo ma pełen dysk!' },
  { 'joke': 'Co mówi jeden bit do drugiego?', 'response': '„Trzymaj się, zaraz się przestawiamy!”' }
];

let lameJoke = [
  { 'joke': 'Dlaczego programiści preferują noc?', 'response': 'Bo w nocy jest mniej bugów do łapania!' },
  { 'joke': 'Jak nazywa się bardzo szybki programista?', 'response': 'Błyskawiczny kompilator!' }
];

// Endpoint 1: Zwraca listę kategorii
app.get('/jokebook/categories', (req, res) => {
  res.json(categories);
});

// Endpoint 2: Zwraca losowy żart z wybranej kategorii
app.get('/jokebook/joke/:category', (req, res) => {
  const category = req.params.category;

  // Sprawdzenie, która kategoria została wybrana
  if (category === 'funnyJoke') {
    const randomJoke = funnyJoke[Math.floor(Math.random() * funnyJoke.length)];
    res.json(randomJoke);
  } else if (category === 'lameJoke') {
    const randomJoke = lameJoke[Math.floor(Math.random() * lameJoke.length)];
    res.json(randomJoke);
  } else {
    // Jeśli podano nieprawidłową kategorię
    res.status(404).json({ error: `no jokes for category [${category}]` });
  }
});

// Uruchomienie serwera
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
