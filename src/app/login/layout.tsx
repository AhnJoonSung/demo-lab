export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen bg-muted/20 flex items-center justify-center">
      {children}
    </div>
  );
}
