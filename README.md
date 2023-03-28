## GPTFY - Generador de playlists de Spotify utilizando ChatGPT
Este proyecto ha sido desarrollado para la asignatura "Extracción de información desde la red social". Se trata de una aplicación web que utiliza el modelo de lenguaje natural ChatGPT para crear playlists de Spotify en base a las recomendaciones obtenidas.


## Tecnologías utilizadas
- **Remix.run**: Framework para el desarrollo de aplicaciones web utilizando React.
- **Openai API**: Utiliza 'gpt-3.5-turbo' como modelo de lenguaje natural para la generación de texto.
- **Spotify API**: API de Spotify para la autenticación de usuarios y acceso a sus datos.


## Estructura del repositorio
El repositorio tiene dos carpetas:    
- **gptfy**: Contiene la aplicacion web.    
- **py-gptfy**: Contiene un script python que implementa una funcionalidad similar.    
```bash
.
└── gptfy/
    ├── gptfy             <-- contiene la aplicacion web/
    │   ├── app/
    │   │   └── ...
    │   └── .env.sample
    └── py-gptfy/
        ├── main.py        <-- script python 
        ├── .env.sample
        └── ...
``` 

## Como ejecutar el proyecto
1. Clonar el repositorio:

        git clone https://github.com/tu-usuario/gptfy.git
2. Accede al directorio /gptfy 
3. Instalar las dependencias:

        npm install
4. Configurar las credenciales de la API de Spotify en un archivo .env en la raíz del proyecto. Hay un ejemplo en el fichero .env.sample con el nombre de las variables necesarias.
5. Ejecutar el servidor de desarrollo.

        npm run dev


## Referencias
[Remix Docs](https://remix.run/docs)   
[Spotify Web API](https://developer.spotify.com/documentation/web-api)   
[Openai API](https://platform.openai.com/docs/api-reference)   


## Autores
[Rafa Esparza](https://github.com/fytta)    
[Borja Albert](https://github.com/bgramaje)    
