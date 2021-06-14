import {NestFactory} from "@nestjs/core";
import {AppModule} from "./app.module";

(async function () {

    const PORT = process.env.PORT || 5000;
    const app = await NestFactory.create(AppModule);

    app.enableCors();
    await app.listen(PORT, () => {
        console.log(`Server is running... ${PORT}`);
    })

})()