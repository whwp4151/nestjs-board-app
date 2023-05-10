import { Repository } from "typeorm";
import { Board } from "./board.entity";
import { CustomRepository } from "src/db/typeorm-ex.decorator";
import { CreateBoardDto } from "./dto/create-board.dto";
import { BoardStatus } from "./board-status.enum";

@CustomRepository(Board)
export class BoardRepository extends Repository<Board> {

    async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
        const {title, description} = createBoardDto;

        const board = this.create({
            title,
            description,
            status: BoardStatus.PUBLIC,
        })

        await board.save();
        return board;
    }

}