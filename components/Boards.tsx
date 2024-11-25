// components/Boards.tsx
'use client';

import { useQuery } from '@tanstack/react-query';
import { request } from 'graphql-request';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { format } from 'date-fns';
import { useTokenSymbol } from '@/hooks/useContract';
import { Board } from '@/types/types';
import { formatUnits } from 'viem';
import { Address } from './ui/Address';
import { User2, Calendar, Coins } from 'lucide-react';
import { BOARDS } from '@/graphql/queries';

const url = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT as string;

// 单个 Board 组件
const BoardCard = ({ board }: { board: Board }) => {
  const { data: tokenSymbol } = useTokenSymbol(board.rewardToken); // 在组件内部使用 useTokenSymbol

  return (
    <Link key={board.id} href={`/board/${board.id}`}>
      <Card>
        <CardHeader>
          <CardTitle>{board.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{board.description}</p>
          <div className="flex justify-between items-center text-xs mt-4 text-muted-foreground">
            <div className="flex items-center gap-1">
              <User2 className="h-4 w-4" />
              <Address address={board.creator} />
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {format(new Date(parseInt(board.createdAt) * 1000), 'PPP')}
            </div>
            <div className="flex items-center gap-1">
              <Coins className="h-4 w-4" />
              {formatUnits(BigInt(board.totalPledged), 18)} {tokenSymbol ?? ''}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default function Boards() {
  const { data } = useQuery({
    queryKey: ['boards'],
    async queryFn() {
      const result = await request(url, BOARDS) as { boards: Board[] };
      return result.boards as Board[];
    },
  });

  return (
    <>
      {data?.map((board: Board) => (
        <BoardCard key={board.id} board={board} /> // 渲染 BoardCard 组件
      ))}
    </>
  );
}