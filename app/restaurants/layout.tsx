import "./restaurants.css";

export default function RestaurantsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="restaurants" lang="en" dir="ltr">
      {children}
    </div>
  );
}
