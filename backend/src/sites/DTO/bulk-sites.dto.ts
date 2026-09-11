import { ArrayNotEmpty, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { SiteDto } from "./site.dto";

export class BulkSitesDto{

    @ArrayNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => SiteDto)
    sites: SiteDto[];
}
