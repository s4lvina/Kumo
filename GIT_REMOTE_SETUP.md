# 🔗 Configuración de Repositorio Remoto

Este archivo contiene instrucciones para conectar tu repositorio local de Kumo con un repositorio remoto en GitHub, GitLab, Bitbucket u otro servicio.

## 📊 Estado Actual del Repositorio

✅ **Commit Inicial Completado**
- **Commit Hash**: `d08c3c1`
- **Archivos**: 73 archivos
- **Líneas de código**: 20,617 líneas
- **Branch**: `main`

## 🌐 Conectar con GitHub

### 1. Crear un repositorio en GitHub
1. Ve a https://github.com/new
2. Nombre del repositorio: `Kumo` (o el que prefieras)
3. **NO** inicialices con README, .gitignore o licencia (ya los tenemos)
4. Haz clic en "Create repository"

### 2. Conectar el repositorio local con GitHub

```bash
# Agregar el remote (reemplaza <username> con tu usuario de GitHub)
git remote add origin https://github.com/<username>/Kumo.git

# O si prefieres SSH:
git remote add origin git@github.com:<username>/Kumo.git

# Verificar que se agregó correctamente
git remote -v

# Hacer push del commit inicial
git push -u origin main
```

### 3. Si hay problemas con la rama principal

Si GitHub usa `master` por defecto en lugar de `main`:

```bash
# Opción 1: Renombrar tu rama local a master
git branch -M master
git push -u origin master

# Opción 2: Cambiar la rama por defecto en GitHub
# Ve a Settings > Branches en tu repositorio de GitHub
# Cambia la rama por defecto a "main"
```

## 🦊 Conectar con GitLab

### 1. Crear un proyecto en GitLab
1. Ve a https://gitlab.com/projects/new
2. Nombre del proyecto: `Kumo`
3. Visibilidad: Private (o la que prefieras)
4. **NO** inicialices con README
5. Haz clic en "Create project"

### 2. Conectar el repositorio local

```bash
# Agregar el remote
git remote add origin https://gitlab.com/<username>/Kumo.git

# O con SSH:
git remote add origin git@gitlab.com:<username>/Kumo.git

# Push
git push -u origin main
```

## 🪣 Conectar con Bitbucket

### 1. Crear un repositorio en Bitbucket
1. Ve a https://bitbucket.org/repo/create
2. Nombre: `Kumo`
3. **NO** incluyas README
4. Crea el repositorio

### 2. Conectar

```bash
# Agregar el remote
git remote add origin https://bitbucket.org/<username>/kumo.git

# Push
git push -u origin main
```

## 🔄 Comandos Git Útiles

### Ver el estado del repositorio
```bash
git status
```

### Ver el historial de commits
```bash
git log --oneline
git log --graph --oneline --all
```

### Ver los remotes configurados
```bash
git remote -v
```

### Cambiar la URL del remote
```bash
git remote set-url origin <nueva-url>
```

### Eliminar un remote
```bash
git remote remove origin
```

### Hacer push de todos los branches
```bash
git push --all origin
```

## 📝 Configurar Git (si aún no lo has hecho)

```bash
# Configurar tu nombre
git config --global user.name "Tu Nombre"

# Configurar tu email
git config --global user.email "tu.email@example.com"

# Ver la configuración actual
git config --list
```

## 🔐 Autenticación

### GitHub con Token (Recomendado)

1. Ve a GitHub Settings > Developer settings > Personal access tokens
2. Genera un nuevo token con permisos de `repo`
3. Usa el token como contraseña cuando hagas push

### SSH (Alternativa)

1. Genera una clave SSH:
```bash
ssh-keygen -t ed25519 -C "tu.email@example.com"
```

2. Agrega la clave pública a tu cuenta de GitHub/GitLab/Bitbucket
3. Usa la URL SSH para el remote

## 🚀 Próximos Pasos Después del Push

Una vez que hayas hecho push a tu repositorio remoto:

1. **Configura GitHub Pages** (opcional) para el frontend
2. **Configura CI/CD** (GitHub Actions, GitLab CI) para:
   - Linting automático
   - Testing
   - Deployment automático
3. **Protege la rama main**:
   - Requiere pull requests para cambios
   - Requiere revisiones de código
   - Previene force pushes
4. **Configura dependabot** para actualizaciones de dependencias

## 📋 Archivo .gitignore

Ya tienes un `.gitignore` completo que excluye:
- `node_modules/`
- `venv/` y entornos virtuales de Python
- `dist/` y builds
- `.env` y archivos de configuración sensibles
- Archivos temporales y de sistema

## 🔒 Seguridad

**IMPORTANTE**: Antes de hacer push:

✅ Verifica que no hay credenciales en el código
✅ Revisa que `.env` está en `.gitignore`
✅ Confirma que `venv/` y `node_modules/` están excluidos
✅ Asegúrate de no incluir API keys o tokens

## 📊 Estadísticas del Proyecto

```
Lenguajes principales:
- TypeScript: ~60%
- Python: ~15%
- Markdown: ~10%
- CSS/Tailwind: ~10%
- Jinja2: ~5%

Estructura:
- Frontend: React 18 + TypeScript + Vite
- Backend: FastAPI + Python 3.10+
- Documentation: Markdown extenso

Total: 20,617 líneas de código en 73 archivos
```

## 🤝 Colaboración

Si vas a trabajar en equipo:

1. **Protege la rama main**
2. **Crea branches para features**:
   ```bash
   git checkout -b feature/nombre-del-feature
   ```
3. **Haz pull requests** para revisión de código
4. **Usa conventional commits**:
   - `feat:` para nuevas funcionalidades
   - `fix:` para correcciones
   - `docs:` para documentación
   - `refactor:` para refactorización
   - `test:` para tests

## ❓ Problemas Comunes

### "rejected - non-fast-forward"
```bash
# Si el remoto tiene commits que no tienes localmente
git pull --rebase origin main
git push origin main
```

### "remote origin already exists"
```bash
# Elimina el remote existente y agrégalo de nuevo
git remote remove origin
git remote add origin <url>
```

### "permission denied"
```bash
# Verifica tu autenticación (token o SSH)
# Para SSH:
ssh -T git@github.com
```

---

**Siguiente paso**: Elige tu plataforma (GitHub/GitLab/Bitbucket) y sigue las instrucciones correspondientes para conectar tu repositorio.

Una vez conectado, podrás:
- 🔄 Hacer push y pull de cambios
- 👥 Colaborar con otros desarrolladores
- 🚀 Configurar deployment automático
- 📊 Trackear issues y features
- 🔍 Revisar código con pull requests

