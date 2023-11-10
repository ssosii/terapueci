<?php


namespace App\Service;


use Doctrine\ORM\Tools\Pagination\Paginator;

class PaginatorService
{
    public function paginate($query, $page = 1, $limit = 10, $routeParams = array())
    {
        $paginator = new Paginator($query);

        $paginator->getQuery()
            ->setFirstResult($limit * ($page - 1)) // Offset
            ->setMaxResults($limit); // Limit

        $data = $paginator->getIterator();
        $total = $paginator->count();
        $pages = intval( ceil($total / $limit) );
        return [
            'fetched' => $data->count(),
            'data' => $data,
            'total' => $total,
            'page' => $page,
            'pages' => $pages === 0 ? 1 : $pages ,
            'routeParams' => $routeParams,
        ];
    }
}