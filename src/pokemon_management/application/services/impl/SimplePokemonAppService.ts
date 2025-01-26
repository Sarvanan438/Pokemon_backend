import InternalServerError from "../../../../shared/errors/InternalServerError";
import { IPokemonService, PokemonService } from "../../../domain/services";
import { PokemonDTO } from "../../dto";
import PokemonDTOFactory, {
  IPokemonDTOFactory,
} from "../../factories/PokemonDTO.factory";
import IPokemonAppService from "../PokemonAppService";

class PokemonAppService implements IPokemonAppService {
  private static instance: PokemonAppService;

  private constructor(
    private pokemonDomainService: IPokemonService,
    private dtoFactory: IPokemonDTOFactory
  ) {}

  public static getInstance(): PokemonAppService {
    if (!PokemonAppService.instance) {
      PokemonAppService.instance = new PokemonAppService(
        PokemonService,
        new PokemonDTOFactory()
      );
    }
    return PokemonAppService.instance;
  }
  getPokemons: () => Promise<Array<PokemonDTO>> = async () => {
    try {
      const pokemons = await this.pokemonDomainService.getPokemonsBy();
      return pokemons.map(this.dtoFactory.createDTOFromEntity);
    } catch (e) {
      console.error(e);
      throw new InternalServerError();
    }
  };
}

export default PokemonAppService.getInstance();
