<?php
session_start();
require_once 'config.php';

$error = '';

// Pokud už přihlášen → přesměruj
if (isset($_SESSION['user_email'])) {
    header('Location: dashboard.php');
    exit;
}

// Zpracování formuláře
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email    = trim(strtolower($_POST['email'] ?? ''));
    $password = $_POST['password'] ?? '';

    if (isset($CLIENTS[$email]) && password_verify($password, $CLIENTS[$email]['password_hash'])) {
        $_SESSION['user_email']    = $email;
        $_SESSION['user_name']     = $CLIENTS[$email]['name'];
        $_SESSION['user_role']     = $CLIENTS[$email]['role'];
        $_SESSION['client_name']   = $CLIENTS[$email]['client_name'];
        header('Location: dashboard.php');
        exit;
    } else {
        $error = 'Špatný email nebo heslo.';
    }
}
?>
<!DOCTYPE html>
<html lang="cs">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>reaktivuj — Přihlášení</title>
<script src="https://cdn.tailwindcss.com"></script>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
  * { font-family: 'Inter', sans-serif; }
  :root { --green: #00c04e; --green-dark: #007a31; }
  .gradient-green { background: linear-gradient(135deg, #00c04e 0%, #007a31 100%); }
  .logo-text { font-size: 2rem; font-weight: 900; color: white; letter-spacing: -0.03em; }
  input:focus { outline: none; border-color: var(--green) !important; box-shadow: 0 0 0 3px rgba(0,192,78,0.15); }
  .btn-green { background: linear-gradient(135deg, #00c04e 0%, #009a3e 100%); }
  .btn-green:hover { background: linear-gradient(135deg, #00a843 0%, #007a31 100%); }
</style>
</head>
<body class="min-h-screen flex" style="background: #f8f8f8;">

  <!-- Levá část — zelená brand -->
  <div class="gradient-green hidden lg:flex lg:w-1/2 flex-col justify-between p-12">
    <div>
      <div class="logo-text">reaktivuj</div>
      <div class="text-sm mt-1" style="color: rgba(255,255,255,0.6);">Klientský dashboard</div>
    </div>
    <div>
      <div class="text-white text-2xl font-bold mb-3" style="line-height: 1.3;">
        Přehled výsledků<br>vašeho email marketingu
      </div>
      <div class="text-sm" style="color: rgba(255,255,255,0.7);">
        Tržby, kampaně, automatizace — vše na jednom místě.
      </div>
    </div>
    <div class="flex items-center gap-3">
      <div class="w-2 h-2 rounded-full bg-white opacity-60"></div>
      <div class="text-sm" style="color: rgba(255,255,255,0.6);">reaktivuj.cz</div>
    </div>
  </div>

  <!-- Pravá část — login formulář -->
  <div class="flex-1 flex items-center justify-center p-8">
    <div class="w-full max-w-sm">

      <!-- Logo mobile -->
      <div class="lg:hidden mb-8 text-center">
        <div class="text-3xl font-black" style="color: var(--green); letter-spacing: -0.03em;">reaktivuj</div>
      </div>

      <h2 class="text-2xl font-bold text-gray-900 mb-1">Přihlášení</h2>
      <p class="text-gray-500 text-sm mb-8">Zadejte své přihlašovací údaje</p>

      <?php if ($error): ?>
        <div class="mb-4 px-4 py-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
          ⚠️ <?= htmlspecialchars($error) ?>
        </div>
      <?php endif; ?>

      <form method="POST" action="">
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
          <input
            type="email"
            name="email"
            required
            autocomplete="email"
            value="<?= htmlspecialchars($_POST['email'] ?? '') ?>"
            placeholder="vas@email.cz"
            class="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-900 text-sm transition-all"
          >
        </div>

        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 mb-1.5">Heslo</label>
          <input
            type="password"
            name="password"
            required
            autocomplete="current-password"
            placeholder="••••••••"
            class="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-900 text-sm transition-all"
          >
        </div>

        <button
          type="submit"
          class="btn-green w-full py-3 rounded-xl text-white font-semibold text-sm transition-all"
        >
          Přihlásit se →
        </button>
      </form>

      <p class="text-center text-xs text-gray-400 mt-8">
        Potřebujete přístup? Napište nám na
        <a href="mailto:info@reaktivuj.cz" class="underline">info@reaktivuj.cz</a>
      </p>
    </div>
  </div>

</body>
</html>
