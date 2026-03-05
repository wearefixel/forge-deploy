<?php

namespace Fixel\ForgeDeploy;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CommitResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'hash' => $this->resource->getHash(),
            'shortHash' => $this->resource->getShortHash(),
            'message' => $this->resource->getMessage(),
            'author' => $this->resource->getAuthorName(),
            'date' => $this->resource->getAuthorDate()->format('Y-m-d H:i:s'),
        ];
    }
}
