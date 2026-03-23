<?php
// ============================================
// REAKTIVUJ.CZ — DASHBOARD CONFIG
// Přidej klienty sem. Hesla jsou hashovaná.
// Jak vygenerovat hash: php -r "echo password_hash('heslo123', PASSWORD_DEFAULT);"
// ============================================

$CLIENTS = [
    'roman@reaktivuj.cz' => [
        'password_hash' => password_hash('reaktivuj2026', PASSWORD_DEFAULT), // ZMĚŇ HESLO
        'name'          => 'Roman Staněk',
        'role'          => 'admin',
        'client_name'   => 'reaktivuj.cz (admin)',
    ],
    'klientka@onlinepilates.cz' => [
        'password_hash' => password_hash('pilates2026', PASSWORD_DEFAULT), // ZMĚŇ HESLO
        'name'          => 'Online Pilates s.r.o.',
        'role'          => 'client',
        'client_name'   => 'Online Pilates s.r.o.',
    ],
    // Přidat dalšího klienta:
    // 'email@klient.cz' => [
    //     'password_hash' => password_hash('jehoheslo', PASSWORD_DEFAULT),
    //     'name'          => 'Jméno klienta',
    //     'role'          => 'client',
    //     'client_name'   => 'Firma s.r.o.',
    // ],
];
