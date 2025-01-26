import { ExpressApiHandlerType } from "../../../shared/types";
import { IPokemonAppService } from "../../application/services";
import SimplePokemonAppService from "../../application/services/impl/SimplePokemonAppService";

class PokemonController {
  private static instance: PokemonController;

  private constructor(private service: IPokemonAppService) {}

  public static getInstance(service: IPokemonAppService): PokemonController {
    if (!PokemonController.instance) {
      PokemonController.instance = new PokemonController(service);
    }
    return PokemonController.instance;
  }

  getPokemons: ExpressApiHandlerType = async (req, res, next) => {
    try {
      const pokemons = await this.service.getPokemons();
      console.log("cont", pokemons);
      res.status(200).json({ message: "success", data: pokemons });
    } catch (e) {
      next(e);
    }
  };
}

export default PokemonController.getInstance(SimplePokemonAppService);
