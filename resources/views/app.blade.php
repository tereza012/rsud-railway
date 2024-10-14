<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0"/>
    @php(\Illuminate\Support\Env::get('APP_ENV') == 'local' ? '' : '<meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">')
    <!--<script src="http://localhost:8097"></script>-->
    @viteReactRefresh
    @vite(['resources/js/app.tsx', 'resources/css/app.css'])
    @inertiaHead
</head>
<body>
@inertia
</body>
</html>

