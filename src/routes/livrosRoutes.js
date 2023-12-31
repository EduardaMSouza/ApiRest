import  express  from "express";
import livroController from "../controller/livroController.js";
import paginar from "../middlewares/paginar.js";

const router = express.Router();


router
  .get("/livros", livroController.listarLivros, paginar)
  .get("/livros/busca", livroController.listarLivrosPorFiltro, paginar)
  .get("/livros/:id", livroController.listarLivroPorId)
  .post("/livros", livroController.cadastrarLivro)
  .put("/livros/:id", livroController.atualizaraLivro)
  .delete("/livros/:id", livroController.excluirLivro);


export default router;