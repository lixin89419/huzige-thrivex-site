import { useHasPermission } from '@/utils/permission';

interface Props {
    code: string;
    children: React.ReactNode;
}

export default ({ code, children }: Props) => {
    const hasPermission = useHasPermission(code);
    return hasPermission ? children : null;
}